<?php

namespace App\Event\Api;

use App\Event\Api\Input\CreateEventInput;

interface ApiInterface
{
    public function createEvent(CreateEventInput $input): string;
}