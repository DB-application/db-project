<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

interface UserInvitationRepositoryInterface
{

    /**
     * @param string $id
     * @return UserInvitation|null
     */
    public function findById(string $id): ?UserInvitation;

    /**
     * @param string $userId
     * @param string $eventId
     * @return mixed
     */
    public function findByUserIdAndEventId(string $userId, string $eventId): ?UserInvitation;

    /**
     * @param string[] $userIds
     * @param string $eventId
     * @return UserInvitation[]|\Iterator
     */
    public function findByUserIdsAndEventId(array $userIds, string $eventId): \Iterator;

    /**
     * @param UserInvitation $invitation
     */
    public function add(UserInvitation $invitation): void;

    public function update(): void;

    /**
     * @param UserInvitation $invitation
     */
    public function remove(UserInvitation $invitation): void;
}