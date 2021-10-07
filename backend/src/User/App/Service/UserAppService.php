<?php
declare(strict_types=1);

namespace App\User\App\Service;

use App\Common\Domain\UuidGenerator;
use App\User\App\Data\GetUserRequestInterface;
use App\User\Domain\Exception\InvalidUserEmail;
use App\User\Domain\Model\Email;
use App\User\Domain\Model\Password;
use App\User\Domain\Model\User;
use App\User\Domain\Model\UserRepositoryInterface;

class UserAppService
{
    /** @var UserRepositoryInterface */
    private $repository;

    public function __construct(UserRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param string $email
     * @param string $password
     * @param string $username
     * @throws InvalidUserEmail
     */
    public function createUser(string $email, string $password, string $username): void
    {
        // TODO: обернуть в транзакцию
        $user = $this->repository->findUserByEmail($email);
        if ($user !== null)
        {
            throw new InvalidUserEmail('User with this email already exist');
        }
        $user = new User(UuidGenerator::generateUuid(), new Email($email), new Password(md5($password)), $username);
        $this->repository->add($user);
    }

    public function getUser(GetUserRequestInterface $request): void
    {
        $email = $request->getEmail();
        $password = $request->getPassword();
        $login = $request->getLogin();
        if ($email !== null)
        {
            $this->repository->findUserByEmailAndPassword($email, $password);
        } else if ($login !== null)
        {
            $this->repository->findUserByUsernameAndPassword($login, $password);
        }
    }
}