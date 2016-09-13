class CreateSettings < ActiveRecord::Migration[5.0]
  def change
    create_table :settings do |t|
      t.integer :user_id, null: false
      t.string :language, null: false
      t.string :currency_code, null: false
      t.integer :start_date, null: false
      t.integer :start_date_skip_option, null: false

      t.timestamps
    end

    add_index :settings, [:user_id]
  end
end
