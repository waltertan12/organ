Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resources :tracks, only: [:show, :index, :create]
  end
end
