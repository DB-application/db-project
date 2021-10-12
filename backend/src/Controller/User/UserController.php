<?php
declare(strict_types=1);

namespace App\Controller\User;

use App\User\Api\ApiInterface;
use App\User\Api\Input\CreateUserInput;
use App\User\Api\Input\GetUserInput;
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

//    private function handleException()
}