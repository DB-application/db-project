<?php
declare(strict_types=1);

namespace App\Security;

use App\Common\Exception\UserNotAuthenticated;
use App\Common\Security\SecurityContextInterface;
use Symfony\Component\Security\Core\Security;

class SecurityContext implements SecurityContextInterface
{
    /** @var Security */
    private $security;


    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @return string|null
     * @throws UserNotAuthenticated
     */
    public function getAuthenticateUserId(): ?string
    {
        $authorizationUser = $this->security->getUser();
        if (!$authorizationUser)
        {
            throw new UserNotAuthenticated();
        }
        return $authorizationUser->getUserIdentifier();
    }
}