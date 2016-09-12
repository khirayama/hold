class CreateTransactionCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :transaction_categories do |t|
      t.integer :user_id, null: false
      t.string :name, null: false
      t.string :payment, default: true, null: false
      t.string :income, default: false, null: false

      t.timestamps
    end

    add_index :transaction_categories, [:user_id]
  end
end
