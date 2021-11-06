<?php
declare(strict_types=1);

namespace App\Event\App\Service;

use App\Common\Domain\Uuid;
use App\Common\Domain\UuidGenerator;
use App\Event\Domain\Model\Event;
use App\Event\Domain\Model\EventRepositoryInterface;

class EventAppService
{
    /** @var EventRepositoryInterface */
    private $repository;

    public function __construct(EventRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function createEvent(string $title, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, string $organizerId, ?string $description, ?string $place): string
    {
        // TODO: обернуть в транзакцию
        $event = new Event(UuidGenerator::generateUuid(), $title, $description, $startDate, $endDate, $place, new Uuid($organizerId), null, false);
        $this->repository->add($event);
        return (string)$event->getId();
    }
}