<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

interface EventRepositoryInterface
{
    public function findEventById(string $eventId): Event;

    public function add(Event $event): void;

    public function update(): void;

    public function remove($eventId): void;
}