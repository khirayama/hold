# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160828021215) do

  create_table "accounts", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "name"
    t.integer  "amount",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "transaction_categories", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_transaction_categories_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.integer  "user_id",                 null: false
    t.string   "from_account_id"
    t.string   "to_account_id"
    t.string   "transaction_category_id"
    t.integer  "amount",                  null: false
    t.date     "payment_date"
    t.date     "transaction_date"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.index ["user_id", "transaction_category_id"], name: "index_transactions_on_user_id_and_transaction_category_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",   null: false
    t.string   "uid",        null: false
    t.string   "nickname",   null: false
    t.string   "image_url",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true
  end

end
