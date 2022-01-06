<?php
declare(strict_types=1);

namespace App\Workspace\Domain\Model;

use App\Workspace\Domain\Exception\InvitedUserNotFoundException;
use App\Workspace\Domain\Exception\UserAlreadyInvitedException;
use Doctrine\Common\Collections\ArrayCollection;

class Workspace
{
    /** @var WorkspaceId */
    private $id;
    /** @var string */
    private $name;
    /** @var bool */
    private $isDefault;
    /** @var string */
    private $ownerId;
    /** @var User[]|ArrayCollection */
    private $users;

    public function __construct(WorkspaceId $id, string $name, string $ownerId, bool $isDefault)
    {
        $this->id = $id;
        $this->name = $name;
        $this->isDefault = $isDefault;
        $this->ownerId = $ownerId;
        $this->users = new ArrayCollection();
    }

    public function getId(): WorkspaceId
    {
        return $this->id;
    }

    public function getOwnerId(): string
    {
        return $this->ownerId;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function isDefault(): bool
    {
        return $this->isDefault;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @param string $userId
     * @throws UserAlreadyInvitedException
     */
    public function addUser(string $userId): void
    {
        foreach ($this->users as $invitedUser)
        {
            if ($invitedUser->getUserId() === $userId)
            {
                throw new UserAlreadyInvitedException($userId);
            }
        }

        $this->users->add(new User($this->getId(), $userId));
    }

    /**
     * @param string $userId
     * @throws InvitedUserNotFoundException
     */
    public function removeUser(string $userId): void
    {
        foreach ($this->users as $key => $invitedUser)
        {
            if ($invitedUser->getUserId() === $userId)
            {
                $this->users->remove($key);
                return;
            }
        }
        throw new InvitedUserNotFoundException($userId, $this->getId());
    }
}