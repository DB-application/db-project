<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

interface EventRepositoryInterface
{
    public function add(Event $event): void;

    public function update(): void;
}