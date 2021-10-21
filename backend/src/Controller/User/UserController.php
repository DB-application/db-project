<?php
declare(strict_types=1);

namespace App\Controller\User;

use App\Common\Exception\UserNotAuthenticated;
use App\Common\Security\SecurityContextInterface;
use App\Security\UserAuthenticator;
use App\User\Api\ApiInterface;
use App\User\Api\Input\AuthenticateUserInput;
use App\User\Api\Input\CreateUserInput;
use App\User\App\Data\UserData;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserController extends AbstractController
{
    /** @var ApiInterface */
    private $userApi;
    /** @var SecurityContextInterface */
    private $securityContext;
    /** @var TokenStorageInterface */
    private $tokenStorage;
    /** @var UserAuthenticator */
    private $authenticator;

    public function __construct(ApiInterface $userApi, TokenStorageInterface $tokenStorage, SecurityContextInterface $securityContext, UserAuthenticator $authenticator)
    {
        $this->userApi = $userApi;
        $this->tokenStorage = $tokenStorage;
        $this->securityContext = $securityContext;
        $this->authenticator = $authenticator;
    }

    /**
     * @Route("/register")
     */
    public function registerUser(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        $input = new CreateUserInput($requestData['email'], md5($requestData['password']), $requestData['username']);
        $this->userApi->createUser($input);

        return new Response();
    }

    /**
     * @Route("/logout")
     */
    public function logout(Request $request): void
    {
        $this->authenticator->logout($request);
    }

    /**
     * @Route("/login")
     */
    public function loginUser(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        $input = new AuthenticateUserInput(md5($requestData['password']), $requestData['login']);
        try
        {
            $this->userApi->authenticateUser($input);
        } catch (\Exception $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        return new Response();
    }

    /**
     * @Route("/get/user_data")
     */
    public function getUserData(Request $request): Response
    {
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
        } catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        $userData = $this->userApi->getUserData($userId);
        return new Response($this->serializeUserData($userData));
    }

    private function serializeUserData(UserData $userData): string
    {
        $data = [
            'id' => $userData->getUserId(),
            'email' => $userData->getEmail(),
            'username' => $userData->getUsername(),
            'avatarUrl' => $userData->getAvatarUrl(),
            'phone' => $userData->getPhone(),
            'firstName' => $userData->getFirstName(),
            'lastName' => $userData->getLastName(),
        ];

        return json_encode($data, JSON_THROW_ON_ERROR);
    }

    private function buildDummyUser(): UserData
    {
        return new UserData(
            'testUild',
            'owner@mail.ru',
            '12345Q',
            'owner',
            'owner:12345Q',
            'owner',
            'jopa',
            '+79123456789',
            'https://google.com'
        );
    }
}