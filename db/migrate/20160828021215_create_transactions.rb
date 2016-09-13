class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.integer :user_id, null: false
      t.string :from_account_id
      t.string :to_account_id
      t.string :transaction_category_id
      t.float :amount, null: false
      t.date :payment_date
      t.date :transaction_date
      t.string :note

      t.timestamps
    end

    add_index :transactions, [:user_id, :transaction_category_id]
  end
end
