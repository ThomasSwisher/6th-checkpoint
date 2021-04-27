import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import BoardSchema from '../models/Board'

// TODO ===================================
class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Boards = mongoose.model('Board', BoardSchema);
}

export const dbContext = new DbContext()
