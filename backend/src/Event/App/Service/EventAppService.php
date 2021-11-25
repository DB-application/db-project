<?php
declare(strict_types=1);

namespace App\Event\App\Service;

use App\Common\Domain\Uuid;
use App\Common\Domain\UuidGenerator;
use App\Event\App\Data\EventData;
use App\Event\App\Query\EventQueryServiceInterface;
use App\Event\Domain\Model\Event;
use App\Event\Domain\Model\EventRepositoryInterface;

class EventAppService
{
    /** @var EventRepositoryInterface */
    private $repository;
    /** @var EventQueryServiceInterface */
    private $eventQueryService;

    public function __construct(EventRepositoryInterface $repository, EventQueryServiceInterface $eventQueryService)
    {
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
            //TODO: выкинуть доменное исключение
        }
        $this->repository->remove($event);
    }

    public function getEventData(string $eventId): ?EventData
    {
        //TODO: если EventData null
        return $this->eventQueryService->getEventData($eventId);
    }

    /**
     * @param string $userId
     * @return EventData[]
     */
    public function getUserEvents(string $userId): array
    {
        return $this->eventQueryService->getUserEvents($userId);
    }
}