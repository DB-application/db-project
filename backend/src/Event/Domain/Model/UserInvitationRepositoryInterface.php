<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

interface UserInvitationRepositoryInterface
{

    /**
     * @param Uuid $id
     * @return UserInvitation|null
     */
    public function findById(Uuid $id): ?UserInvitation;

    /**
     * @param Uuid $userId
     * @param Uuid $eventId
     * @return mixed
     */
    public function findByUserIdAndEventId(Uuid $userId, Uuid $eventId): ?UserInvitation;

    /**
     * @param Uuid[] $userIds
     * @param Uuid $eventId
     * @return UserInvitation[]|\Iterator
     */
    public function findByUserIdsAndEventId(array $userIds, Uuid $eventId): \Iterator;

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