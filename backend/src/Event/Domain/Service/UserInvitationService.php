<?php
declare(strict_types=1);

namespace App\Event\Domain\Service;

use App\Common\Domain\Uuid;
use App\Common\Domain\UuidGenerator;
use App\Event\Domain\Model\EventRepositoryInterface;
use App\Event\Domain\Model\InvitationStatus;
use App\Event\Domain\Model\UserInvitation;
use App\Event\Domain\Model\UserInvitationRepositoryInterface;

class UserInvitationService
{
    /** @var UserInvitationRepositoryInterface */
    private $invitationRepository;
    /** @var EventRepositoryInterface */
    private $eventRepository;

    public function __construct(UserInvitationRepositoryInterface $invitationRepository, EventRepositoryInterface $eventRepository)
    {
        $this->invitationRepository = $invitationRepository;
        $this->eventRepository = $eventRepository;
    }

    public function createUserInvitation(Uuid $userId, Uuid $eventId): void
    {
        $event = $this->eventRepository->findEventById($eventId);
        if ($event === null)
        {
            // сделать доменное исключение
            throw new \RuntimeException("Event does not exists {$eventId}");
        }
        $invitation = $this->invitationRepository->findByUserIdAndEventId($userId, $eventId);
        if ($invitation !== null)
        {
            // сделать доменное исключение
            throw new \RuntimeException("User already invited");
        }
        $invitation = new UserInvitation(UuidGenerator::generateUuid(), $userId, $eventId, InvitationStatus::INVITED);
        $this->invitationRepository->add($invitation);
    }

    /**
     * @param Uuid[] $userIds
     * @param Uuid $eventId
     */
    public function createUsersInvitations(array $userIds, Uuid $eventId): void
    {
        $event = $this->eventRepository->findEventById($eventId);
        if ($event === null)
        {
            // сделать доменное исключение
            throw new \RuntimeException("Event does not exists {$eventId}");
        }
        $invitation = $this->invitationRepository->findByUserIdsAndEventId($userIds, $eventId);
        if ($invitation !== null)
        {
            // сделать доменное исключение
            throw new \RuntimeException("User already invited");
        }
        foreach ($userIds as $userId)
        {
            $invitation = new UserInvitation(UuidGenerator::generateUuid(), $userId, $eventId, InvitationStatus::INVITED);
            $this->invitationRepository->add($invitation);
        }
    }
}