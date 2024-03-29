<?php
declare(strict_types=1);

namespace App\User\App\Service;

use App\Common\App\Transaction\MultiBlockingOperationExecutorInterface;
use App\Common\App\Transaction\TransactionInterface;
use App\Common\Exception\UserNotAuthenticated;
use App\Security\UserAuthenticator;
use App\User\App\Data\AuthenticateUserRequestInterface;
use App\User\App\Data\UserData;
use App\User\App\Lock\LockNames;
use App\User\App\Query\UserQueryServiceInterface;
use App\User\Domain\Model\Email;
use App\User\Domain\Model\UserId;
use App\User\Domain\Service\UserService;

class UserAppService
{
    /** @var UserService */
    private $userService;
    /** @var UserQueryServiceInterface */
    private $userQueryService;
    /** @var UserAuthenticator */
    private $authenticator;
    /** @var TransactionInterface */
    private $transaction;
    /** @var MultiBlockingOperationExecutorInterface */
    private $blockingOperatorExecutor;


    public function __construct(UserService $userService, UserQueryServiceInterface $userQueryService, UserAuthenticator $authenticator, TransactionInterface $transaction, MultiBlockingOperationExecutorInterface $blockingOperationExecutor)
    {
        $this->authenticator = $authenticator;
        $this->userService = $userService;
        $this->userQueryService = $userQueryService;
        $this->transaction = $transaction;
        $this->blockingOperatorExecutor = $blockingOperationExecutor;
    }

    /**
     * @param string $email
     * @param string $password
     * @param string $username
     * @return string
     */
    public function createUser(string $email, string $password, string $username): string
    {
        return (string)$this->transaction->execute(
            function () use ($email, $password, $username): UserId
            {
                return $this->userService->createUser($email, $password, $username);
            }
        );
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
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getUserId($userData->getUserId())],
            function () use ($userData): void
            {
                $this->userService->updateUserData(new UserId($userData->getUserId()), $userData->getUsername(), $userData->getPhone(), $userData->getFirstName(), $userData->getLastName(), new Email($userData->getEmail()), $userData->getAvatarUrl());
            }
        );
        $this->transaction->execute($operation);
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
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getUserId($userId)],
            function () use ($userId, $newPassword, $oldPassword): void
            {
                $this->userService->changeUserPassword(new UserId($userId), $newPassword, $oldPassword);
            }
        );
        $this->transaction->execute($operation);
    }

    //TODO: УДАЛИТь
    public function getAllUsers(): array
    {
        return $this->userQueryService->getAllUsers();
    }
}