<?php
declare(strict_types=1);

namespace App\Controller\User;

use App\User\Api\ApiInterface;
use App\User\Api\Input\AuthenticateUserInput;
use App\User\Api\Input\CreateUserInput;
use App\User\App\Data\UserData;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /** @var ApiInterface */
    private $userApi;
    /** @var RequestStack */
    private $requestStack;

    public function __construct(ApiInterface $userApi, RequestStack $requestStack)
    {
        $this->userApi = $userApi;
        $this->requestStack = $requestStack;
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
     * @Route("/login")
     */
    public function loginUser(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        $input = new AuthenticateUserInput(md5($requestData['password']), $requestData['login']);
        $output = $this->userApi->authenticateUser($input);
        if ($output->getUserData() === null)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        $session = $this->requestStack->getSession();
        $session->set('user_id', $output->getUserData()->getUserId());

        return new Response();
    }

    /**
     * @Route("/get/user_data")
     */
    public function getUserData(Request $request): Response
    {
        $userId = $this->getUserId();
        if ($userId === null)
        {
            $dummyUser = $this->buildDummyUser();
            return new Response($this->serializeUserData($dummyUser));
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

    private function getUserId(): ?string
    {
        $session = $this->requestStack->getSession();
        return $session->get('user_id');
    }
//    private function handleException()
}