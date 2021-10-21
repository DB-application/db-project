<?php
declare(strict_types=1);

namespace App\User\Infrastructure\Query\Hydrator;

use App\Common\Infrastructure\Query\TypeConverter;
use App\User\App\Data\UserData;
use App\User\Infrastructure\Query\Table\UserTable;

class UserDataHydrator
{
    public function hydrateAll(array $data): UserData
    {
        $userId = TypeConverter::hydrateValue($data[UserTable::USER_ID], UserTable::USER_FIELDS[UserTable::USER_ID]);
        $email = TypeConverter::hydrateValue($data[UserTable::EMAIL], UserTable::USER_FIELDS[UserTable::EMAIL]);
        $password = TypeConverter::hydrateValue($data[UserTable::PASSWORD], UserTable::USER_FIELDS[UserTable::PASSWORD]);
        $username = TypeConverter::hydrateValue($data[UserTable::USERNAME], UserTable::USER_FIELDS[UserTable::USERNAME]);
        $loginKey = TypeConverter::hydrateValue($data[UserTable::LOGIN_KEY], UserTable::USER_FIELDS[UserTable::LOGIN_KEY]);
        $firstName = TypeConverter::hydrateValue($data[UserTable::FIRST_NAME], UserTable::USER_FIELDS[UserTable::FIRST_NAME]);
        $lastName = TypeConverter::hydrateValue($data[UserTable::LAST_NAME], UserTable::USER_FIELDS[UserTable::LAST_NAME]);
        $phone = TypeConverter::hydrateValue($data[UserTable::PHONE], UserTable::USER_FIELDS[UserTable::PHONE]);
        $avatarUrl = TypeConverter::hydrateValue($data[UserTable::AVATAR_URL], UserTable::USER_FIELDS[UserTable::AVATAR_URL]);
        return new UserData($userId, $email, $password, $username, $loginKey, $firstName, $lastName, $phone, $avatarUrl);
    }
}