class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.integer :user_id, null: false
      t.string :from_account_id
      t.string :to_account_id
      t.string :category_id
      t.column :amount, 'int unsigned', null: false
      t.date :payment_date
      t.date :transaction_date

      t.timestamps
    end

    add_index :transactions, [:user_id, :category_id, :from_account_id, :to_account_id]
  end
end
