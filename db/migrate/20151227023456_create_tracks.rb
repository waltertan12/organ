class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :name, null: false
      t.text :roll, null: false

      t.timestamps null: false
    end
  end
end
