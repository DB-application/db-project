<?php
declare(strict_types=1);

namespace App\Workspace\Infrastructure\Query;

use App\Workspace\App\Data\NoteData;
use App\Workspace\App\Data\WorkspaceData;
use App\Workspace\App\Query\WorkspaceQueryServiceInterface;
use App\Workspace\Infrastructure\Query\Hydrator\NoteDataHydrator;
use App\Workspace\Infrastructure\Query\Hydrator\WorkspaceDataHydrator;
use App\Workspace\Infrastructure\Query\Table\NoteTable;
use App\Workspace\Infrastructure\Query\Table\WorkspaceTable;
use App\Workspace\Infrastructure\Query\Table\WorkspaceUserTable;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManagerInterface;

class WorkspaceQueryService implements WorkspaceQueryServiceInterface
{
    /** @var Connection */
    private $conn;
    /** @var WorkspaceDataHydrator */
    private $workspaceDataHydrator;
    /** @var NoteDataHydrator */
    private $noteDataHydrator;

    public function __construct(EntityManagerInterface $em, WorkspaceDataHydrator $workspaceDataHydrator, NoteDataHydrator $noteDataHydrator)
    {
        $this->conn = $em->getConnection();
        $this->workspaceDataHydrator = $workspaceDataHydrator;
        $this->noteDataHydrator = $noteDataHydrator;
    }

    public function getWorkspaceData(string $workspaceId): ?WorkspaceData
    {
        $workspaceTableAlias = 'w';
        $workspaceTableJoinAlias = 'w.';

        $qb = $this->conn->createQueryBuilder();
        $qb->from(WorkspaceTable::TABLE_NAME, $workspaceTableAlias);
        $this->addWorkspaceFieldSelect($qb);
        $qb->where($qb->expr()->eq($workspaceTableJoinAlias . WorkspaceTable::ID, ':id'));
        $query = $qb->getSQL();
        $result = $this->conn->executeQuery($query, ['id' => $workspaceId])->fetchAssociative();

        return $result ? $this->workspaceDataHydrator->hydrateRow($result) : null;
    }

    public function getUserWorkspaces(string $userId): array
    {
        $workspaceTableAlias = 'w';
        $workspaceUserTableAlias = 'wu';
        $workspaceTableJoinAlias = 'w.';
        $workspaceUserTableJoinAlias = 'wu.';

        $qb = $this->conn->createQueryBuilder();
        $qb->from(WorkspaceTable::TABLE_NAME, $workspaceTableAlias);
        $this->addWorkspaceFieldSelect($qb);
        $qb->leftJoin(
            $workspaceTableAlias, WorkspaceUserTable::TABLE_NAME, $workspaceUserTableAlias,
            $qb->expr()->eq($workspaceTableJoinAlias . WorkspaceTable::ID, $workspaceUserTableJoinAlias . WorkspaceUserTable::WORKSPACE_ID)
        );
        $qb->where($qb->expr()->eq($workspaceTableJoinAlias . WorkspaceTable::OWNER_ID, ':ownerId'));
        $qb->orWhere($qb->expr()->eq($workspaceUserTableJoinAlias . WorkspaceUserTable::USER_ID, ':userId'));
        $qb->setParameter('userId', $userId);
        $qb->setParameter('ownerId', $userId);
        $qb->groupBy($workspaceTableJoinAlias . WorkspaceTable::ID);
        $result = $qb->execute()->fetchAllAssociative();
        $data = [];
        foreach ($result as $item)
        {
            $data[] = $this->workspaceDataHydrator->hydrateRow($item);
        }

        return $data;
    }

    public function getWorkspaceUserIds(string $workspaceId): array
    {
        $workspaceUserTableAlias = 'wu';
        $workspaceUserTableJoinAlias = 'wu.';
        $qb = $this->conn->createQueryBuilder();
        $qb->from(WorkspaceUserTable::TABLE_NAME, $workspaceUserTableAlias);
        $qb->select($workspaceUserTableJoinAlias . WorkspaceUserTable::USER_ID);
        $qb->where($qb->expr()->eq($workspaceUserTableJoinAlias . WorkspaceUserTable::WORKSPACE_ID, ':workspaceId'));
        $qb->setParameter('workspaceId', $workspaceId);
        return $qb->fetchFirstColumn();
    }

    public function getNotesByWorkspaceId(string $workspaceId): array
    {
        $noteTableAlias = 'n';
        $noteTableJoinAlias = 'n.';
        $qb = $this->conn->createQueryBuilder();
        $qb->from(NoteTable::TABLE_NAME, $noteTableAlias);
        $this->addNoteFieldsSelect($qb, $noteTableJoinAlias);
        $qb->where($qb->expr()->eq($noteTableJoinAlias . WorkspaceUserTable::WORKSPACE_ID, ':workspaceId'));
        $qb->setParameter('workspaceId', $workspaceId);
        $result = $qb->fetchAllAssociative();
        $data = [];
        foreach ($result as $item)
        {
            $data[] = $this->noteDataHydrator->hydrateRow($item);
        }

        return $data;
    }

    public function getNoteContentById(string $noteId): NoteData
    {
        $noteTableAlias = 'n';
        $noteTableJoinAlias = 'n.';
        $qb = $this->conn->createQueryBuilder();
        $qb->from(NoteTable::TABLE_NAME, $noteTableAlias);
        $this->addNoteFieldsSelect($qb, $noteTableJoinAlias);
        $qb->where($qb->expr()->eq($noteTableJoinAlias . WorkspaceUserTable::ID, ':noteId'));
        $qb->setParameter('noteId', $noteId);
        $result = $qb->fetchAssociative();
        return $this->noteDataHydrator->hydrateRow($result);
    }

    private function addNoteFieldsSelect(QueryBuilder $qb, string $alias = 'n.'): void
    {
        $qb->addSelect($alias . NoteTable::ID);
        $qb->addSelect($alias . NoteTable::NAME);
        $qb->addSelect($alias . NoteTable::CONTENT);
        $qb->addSelect($alias . NoteTable::WORKSPACE_ID);
    }

    private function addWorkspaceFieldSelect(QueryBuilder $qb, string $alias = 'w'): void
    {
        $qb->addSelect($alias . '.' . WorkspaceTable::ID);
        $qb->addSelect($alias . '.' . WorkspaceTable::NAME);
        $qb->addSelect($alias . '.' . WorkspaceTable::IS_DEFAULT);
        $qb->addSelect($alias . '.' . WorkspaceTable::OWNER_ID);
    }
}