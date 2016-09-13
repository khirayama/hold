class CreateAccounts < ActiveRecord::Migration[5.0]
  def change
    create_table :accounts do |t|
      t.integer :user_id, null: false
      t.string :name
      t.float :amount, null: false

      t.timestamps
    end

    add_index :accounts, [:user_id]
  end
end
