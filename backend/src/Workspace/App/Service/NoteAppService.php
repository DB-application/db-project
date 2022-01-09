<?php
declare(strict_types=1);

namespace App\Workspace\App\Service;

use App\Common\App\Transaction\MultiBlockingOperationExecutorInterface;
use App\Common\App\Transaction\TransactionInterface;
use App\Workspace\App\Lock\LockNames;
use App\Workspace\Domain\Model\NoteId;
use App\Workspace\Domain\Model\WorkspaceId;
use App\Workspace\Domain\Service\NoteService;

class NoteAppService
{
    /** @var NoteService */
    private $noteService;
    /** @var TransactionInterface */
    private $transaction;
    /** @var MultiBlockingOperationExecutorInterface */
    private $blockingOperatorExecutor;

    public function __construct(
        NoteService $noteService,
        TransactionInterface $transaction,
        MultiBlockingOperationExecutorInterface $blockingOperatorExecutor
    )
    {
        $this->noteService = $noteService;
        $this->transaction = $transaction;
        $this->blockingOperatorExecutor = $blockingOperatorExecutor;
    }

    /**
     * @param string $workspaceId
     * @param string $name
     * @param string $content
     * @return string
     */
    public function createNote(string $workspaceId, string $name, string $content): string
    {
        return (string)$this->transaction->execute(
            function () use ($workspaceId, $name, $content): NoteId
            {
                return $this->noteService->createNote(new WorkspaceId($workspaceId), $name, $content);
            }
        );
    }

    /**
     * @param string $id
     * @param string $content
     */
    public function editNote(string $id, string $content): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getNoteLock($id)],
            function () use ($id, $content)
            {
                $this->noteService->editNote(new NoteId($id), $content);
            }
        );
        $this->transaction->execute($operation);
    }

    /**
     * @param string $id
     * @param string $name
     */
    public function renameNote(string $id, string $name): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getNoteLock($id)],
            function () use ($id, $name)
            {
                $this->noteService->renameNote(new NoteId($id), $name);
            }
        );
        $this->transaction->execute($operation);
    }

    /**
     * @param string $id
     */
    public function removeNote(string $id): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getNoteLock($id)],
            function () use ($id)
            {
                $this->noteService->removeNote(new NoteId($id));
            }
        );
        $this->transaction->execute($operation);
    }
}