<?php
declare(strict_types=1);

namespace App\Controller\User;

use App\User\Api\ApiInterface;
use App\User\Api\Input\CreateUserInput;
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
        $input = new CreateUserInput($requestData['email'], $requestData['password'], $requestData['username']);
        $this->userApi->createUser($input);

        return new Response();
    }

//    private function handleException()
}