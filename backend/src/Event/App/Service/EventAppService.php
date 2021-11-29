<?php
declare(strict_types=1);

namespace App\Event\App\Service;

use App\Common\Domain\Uuid;
use App\Common\Domain\UuidGenerator;
use App\Event\App\Data\EventData;
use App\Event\App\Query\EventQueryServiceInterface;
use App\Event\App\Query\UserInvitationQueryServiceInterface;
use App\Event\Domain\Model\Event;
use App\Event\Domain\Model\EventRepositoryInterface;

class EventAppService
{
    /** @var EventRepositoryInterface */
    private $repository;
    /** @var EventQueryServiceInterface */
    private $eventQueryService;
    /** @var UserInvitationQueryServiceInterface */
    private $invitationQueryService;

    public function __construct(EventRepositoryInterface $repository, EventQueryServiceInterface $eventQueryService, UserInvitationQueryServiceInterface $invitationQueryService)
    {
        $this->invitationQueryService = $invitationQueryService;
        $this->repository = $repository;
        $this->eventQueryService = $eventQueryService;
    }

    public function createEvent(string $title, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, string $organizerId, ?string $description, ?string $place): string
    {
        // TODO: обернуть в транзакцию
        $event = new Event(UuidGenerator::generateUuid(), $title, $description, $startDate, $endDate, $place, new Uuid($organizerId), null, false);
        $this->repository->add($event);
        return (string)$event->getId();
    }

    public function editEvent(string $eventId, string $title, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, string $organizerId, ?string $description, ?string $place): void
    {
        // TODO: обернуть в транзакцию
        //Добавить проверку $organizerId
        $event = $this->repository->findEventById(new Uuid($eventId));
        if ($event === null)
        {
            throw new \RuntimeException("invalid event id {'$eventId'}");
        }
        $event->setName($title);
        $event->setStartDate($startDate);
        $event->setEndDate($endDate);
        $event->setOrganizerId(new Uuid($organizerId));
        $event->setDescription($description);
        $event->setPlace($place);
        $this->repository->update();
    }

    public function removeEvent(string $eventId)
    {
        //TODO: обернуть в транзакцию
        $event = $this->repository->findEventById(new Uuid($eventId));
        if ($event === null)
        {
            throw new \RuntimeException("invalid event id {'$eventId'}");
        }
        $this->repository->remove($event);
    }

    public function getEventData(string $eventId): ?EventData
    {
        //TODO: если EventData null
        $eventData = $this->eventQueryService->getEventData($eventId);
        if ($eventData === null)
        {
            throw new \RuntimeException("invalid event id {'$eventId'}");
        }
        $invitedUsersMap = $this->invitationQueryService->getInvitedUsersByEventIds([$eventData->getEventId()]);
        $eventData->setInvitedUserIds($invitedUsersMap[$eventData->getEventId()]);
        return $eventData;
    }

    /**
     * @param string $userId
     * @return EventData[]
     */
    public function getUserEvents(string $userId): array
    {
        $eventsData = $this->eventQueryService->getUserEvents($userId);
        $eventIds = array_map(
            static function (EventData $eventData): string
            {
                return $eventData->getEventId();
            },
            $eventsData
        );
        $invitedUsersMap = $this->invitationQueryService->getInvitedUsersByEventIds($eventIds);
        foreach ($eventsData as $eventData)
        {
            $eventData->setInvitedUserIds($invitedUsersMap[$eventData->getEventId()] ?? []);
        }

        return $eventsData;
    }
}