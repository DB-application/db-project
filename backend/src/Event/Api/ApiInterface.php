<?php

namespace App\Event\Api;

use App\Event\Api\Input\CreateEventInput;
use App\Event\App\Data\EventData;

interface ApiInterface
{
    public function createEvent(CreateEventInput $input): string;

    public function getEventDataById(string $eventId): ?EventData;

    /**
     * @param string $userId
     * @return EventData[]
     */
    public function getEventsDataByUserId(string $userId): array;
}