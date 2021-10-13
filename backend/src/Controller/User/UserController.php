<?php
declare(strict_types=1);

namespace App\Controller\User;

use App\User\Api\ApiInterface;
use App\User\Api\Input\CreateUserInput;
use App\User\Api\Input\GetUserInput;
use App\User\App\Data\UserData;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /** @var ApiInterface */
    private $userApi;

    public function __construct(ApiInterface $userApi)
    {
        $this->userApi = $userApi;
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
        $input = new GetUserInput(md5($requestData['password']), $requestData['login']);
        $output = $this->userApi->getUser($input);
        if ($output->getUserData() === null)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        // генерировать сессию и сохранять в redis?

        return new Response();
    }

    /**
     * @Route("/get/user_data")
     */
    public function getUserData(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        // Сделать проверку сессии
//        $output = $this->userApi->getUser($input);
//        if ($output->getUserData() === null)
//        {
        $dummyUser = $this->buildDummyUser();
        return new Response($this->serializeUserData($dummyUser));
//        }
        // генерировать сессию и сохранять в redis?

//        return new Response();
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
//    private function handleException()
}