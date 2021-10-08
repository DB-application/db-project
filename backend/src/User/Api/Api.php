<?php
declare(strict_types=1);

namespace App\User\Api;

use App\User\Api\Input\CreateUserInput;
use App\User\Api\Input\GetUserInput;
use App\User\Api\Output\GetUserOutput;
use App\User\App\Service\UserAppService;
use App\User\Domain\Exception\InvalidUserEmail;

class Api implements ApiInterface
{
    /** @var UserAppService */
    private $userService;

    public function __construct(UserAppService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @param CreateUserInput $input
     * @throws InvalidUserEmail
     */
    public function createUser(CreateUserInput $input): void
    {
        try
        {
            $this->userService->createUser($input->getEmail(), $input->getPassword(), $input->getUsername());
        } catch (\Exception $e)
        {
            $this->convertException($e);
        }
    }

    public function getUser(GetUserInput $input): GetUserOutput
    {
        try
        {
            $user = $this->userService->getUser($input);
            return new GetUserOutput($user);
        } catch (\Exception $e)
        {
            $this->convertException($e);
        }
    }

    public function convertException(\Exception $e)
    {
        // TODO: сделать обработку исключений
        throw $e;
    }
}