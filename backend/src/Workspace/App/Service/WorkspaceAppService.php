<?php
declare(strict_types=1);

namespace App\Workspace\App\Service;

use App\Common\App\Transaction\MultiBlockingOperationExecutorInterface;
use App\Common\App\Transaction\TransactionInterface;
use App\Workspace\App\Lock\LockNames;
use App\Workspace\Domain\Model\WorkspaceId;
use App\Workspace\Domain\Service\WorkspaceService;

class WorkspaceAppService
{
    /** @var WorkspaceService */
    private $workspaceService;
    /** @var TransactionInterface */
    private $transaction;
    /** @var MultiBlockingOperationExecutorInterface */
    private $blockingOperatorExecutor;

    public function __construct(
        WorkspaceService $workspaceService,
        TransactionInterface $transaction,
        MultiBlockingOperationExecutorInterface $blockingOperatorExecutor
    )
    {
        $this->workspaceService = $workspaceService;
        $this->transaction = $transaction;
        $this->blockingOperatorExecutor = $blockingOperatorExecutor;
    }

    /**
     * @param string $name
     * @param string $ownerId
     * @return string
     */
    public function createWorkspace(string $name, string $ownerId): string
    {
        return (string)$this->transaction->execute(
            function () use ($name, $ownerId): WorkspaceId
            {
                return $this->workspaceService->createWorkspace($name, $ownerId);
            }
        );
    }

    /**
     * @param string $ownerId
     * @return string
     */
    public function createDefaultWorkspace(string $ownerId): string
    {
        return (string)$this->transaction->execute(
            function () use ($ownerId): WorkspaceId
            {
                return $this->workspaceService->createDefaultWorkspace($ownerId);
            }
        );
    }

    /**
     * @param string $id
     * @param string $name
     */
    public function editWorkspace(string $id, string $name): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getWorkspaceLock($id)],
            function () use ($id, $name)
            {
                $this->workspaceService->editWorkspace(new WorkspaceId($id), $name);
            }
        );
        $this->transaction->execute($operation);
    }

    /**
     * @param string $id
     */
    public function removeWorkspace(string $id): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getWorkspaceLock($id)],
            function () use ($id)
            {
                $this->workspaceService->removeWorkspace(new WorkspaceId($id));
            }
        );
        $this->transaction->execute($operation);
    }

    /**
     * @param string $workspaceId
     * @param array $invitedUserIds
     */
    public function updateInvitedUsers(string $workspaceId, array $invitedUserIds): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getWorkspaceLock($workspaceId)],
            function () use ($workspaceId, $invitedUserIds)
            {
                $this->workspaceService->updateInvitedUsers(new WorkspaceId($workspaceId), $invitedUserIds);
            }
        );
        $this->transaction->execute($operation);
    }

    public function inviteUser(string $workspaceId, string $userId): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getWorkspaceLock($workspaceId)],
            function () use ($workspaceId, $userId)
            {
                $this->workspaceService->inviteUser(new WorkspaceId($workspaceId), $userId);
            }
        );
        $this->transaction->execute($operation);
    }

    public function removeUser(string $workspaceId, string $userId): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getWorkspaceLock($workspaceId)],
            function () use ($workspaceId, $userId)
            {
                $this->workspaceService->removeUser(new WorkspaceId($workspaceId), $userId);
            }
        );
        $this->transaction->execute($operation);
    }
}