<?php
declare(strict_types=1);

namespace App\User\App\Service;

use App\Common\Domain\UuidGenerator;
use App\Common\Exception\UserNotAuthenticated;
use App\Security\UserAuthenticator;
use App\User\App\Data\AuthenticateUserRequestInterface;
use App\User\App\Data\UserData;
use App\User\App\Query\UserQueryServiceInterface;
use App\User\Domain\Exception\InvalidUserEmailException;
use App\User\Domain\Exception\InvalidUserPasswordException;
use App\User\Domain\Model\Email;
use App\User\Domain\Model\Password;
use App\User\Domain\Model\User;
use App\User\Domain\Model\UserRepositoryInterface;

class UserAppService
{
    /** @var UserRepositoryInterface */
    private $repository;
    /** @var UserQueryServiceInterface */
    private $userQueryService;
    /** @var UserAuthenticator */
    private $authenticator;

    public function __construct(UserRepositoryInterface $repository, UserQueryServiceInterface $userQueryService, UserAuthenticator $authenticator)
    {
        $this->authenticator = $authenticator;
        $this->repository = $repository;
        $this->userQueryService = $userQueryService;
    }

    /**
     * @param string $email
     * @param string $password
     * @param string $username
     * @throws InvalidUserEmailException
     */
    public function createUser(string $email, string $password, string $username): void
    {
        // TODO: обернуть в транзакцию
        $user = $this->repository->findUserByEmailAndUserName($email, $username);
        if ($user !== null)
        {
            throw new InvalidUserEmailException('User with this email already exist');
        }
        $user = new User(UuidGenerator::generateUuid(), new Email($email), new Password($password), $username);
        $this->repository->add($user);
    }

    public function getUserData(string $userId): ?UserData
    {
        return $this->userQueryService->getUserDataById($userId);
    }

    /**
     * @param string[] $userIds
     * @return UserData[]
     */
    public function getUsersData(array $userIds): array
    {
        return $this->userQueryService->getUsersDataByIds($userIds);
    }

    public function updateUserData(UserData $userData): void
    {
        //TODO: обернуть в транзакцию
        $user = $this->repository->findUserById($userData->getUserId());
        $user->setPhone($userData->getPhone());
        $user->setUsername($userData->getUsername());
        $user->setLastName($userData->getLastName());
        $user->setFirstName($userData->getFirstName());
        $user->setEmail(new Email($userData->getEmail()));
        $user->setAvatarUrl($userData->getAvatarUrl());
        $this->repository->update();
    }

    /**
     * @throws UserNotAuthenticated
     */
    public function authenticateUser(AuthenticateUserRequestInterface $request): void
    {
        $login = $request->getUsernameOrEmail();
        $password = $request->getPassword();
        $userdata = $this->userQueryService->getUserDataByEmailAndPassword($login, $password);
        if ($userdata === null)
        {
            $userdata = $this->userQueryService->getUserDataByUsernameAndPassword($login, $password);
        }
        if ($userdata === null)
        {
            throw new UserNotAuthenticated();
        }
        $this->authenticator->authenticateUserById($userdata->getUserId());
    }

    public function changeUserPassword(string $userId, string $newPassword, string $oldPassword): void
    {
        $user = $this->repository->findUserById($userId);
        if ($user->getPassword() === $oldPassword)
        {
            $user->setPassword(new Password($newPassword));
            $this->repository->update();
        }
        else
        {
            throw new InvalidUserPasswordException();
        }
    }
}