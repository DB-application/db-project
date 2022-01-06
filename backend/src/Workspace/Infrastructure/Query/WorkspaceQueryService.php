<?php
declare(strict_types=1);

namespace App\Workspace\Infrastructure\Query;

use App\Workspace\App\Data\WorkspaceData;
use App\Workspace\App\Query\WorkspaceQueryServiceInterface;
use App\Workspace\Infrastructure\Query\Hydrator\WorkspaceDataHydrator;
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
    private $hydrator;

    public function __construct(EntityManagerInterface $em, WorkspaceDataHydrator $hydrator)
    {
        $this->conn = $em->getConnection();
        $this->hydrator = $hydrator;
    }

    public function getWorkspaceData(string $workspaceId): ?WorkspaceData
    {
        $const = static function (string $value)
        {
            return $value;
        };

        $qb = $this->conn->createQueryBuilder();
        $qb->from(WorkspaceTable::TABLE_NAME, 'e');
        $this->addWorkspaceFieldSelect($qb);
        $qb->where("{$const(WorkspaceTable::ID)} = :id");
        $query = $qb->getSQL();
        $result = $this->conn->executeQuery($query, ['id' => $workspaceId])->fetchAssociative();

        return $result ? $this->hydrator->hydrateRow($result) : null;
    }

    public function getUserWorkspaces(string $userId): array
    {
        $workspaceTableAlias = 'w';
        $workspaceUserTableAlias = 'wu';
        $workspaceTableJoinAlias = 'w.';
        $workspaceUserTableJoinAlias = 'wu.';

        $qb = $this->conn->createQueryBuilder();
        $qb->from(WorkspaceTable::TABLE_NAME, 'w');
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
            $data[] = $this->hydrator->hydrateRow($item);
        }

        return $data;
    }

    private function addWorkspaceFieldSelect(QueryBuilder $qb, string $alias = 'w'): void
    {
        $qb->addSelect($alias . '.' . WorkspaceTable::ID);
        $qb->addSelect($alias . '.' . WorkspaceTable::NAME);
        $qb->addSelect($alias . '.' . WorkspaceTable::IS_DEFAULT);
        $qb->addSelect($alias . '.' . WorkspaceTable::OWNER_ID);
    }
}