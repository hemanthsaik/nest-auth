import { InitialMigrations1703155631769 } from './1703155631769-initialMigrations'
import { UpdateUserLogs1703559650095 } from './1703559650095-updateUserLogs'
import { AddServiceIdToUserLogs1703569046449 } from './1703569046449-addServiceIdToUserLogs'

export const AuthMigration = [
  InitialMigrations1703155631769,
  UpdateUserLogs1703559650095,
  AddServiceIdToUserLogs1703569046449,
]
