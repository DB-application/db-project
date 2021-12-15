<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

interface EventRepositoryInterface
{
    public function findEventById(Uuid $eventId): ?Event;

    public function add(Event $event): void;

    public function remove(Event $event): void;
}