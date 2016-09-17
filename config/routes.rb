Rails.application.routes.draw do
  root 'static_pages#home'

  get '/auth/:provider/callback' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  get '/locale' => 'static_pages#locale'

  namespace :api, { format: 'json' } do
    namespace :v1 do
      get '/user_status' => 'application#user_status'

      resources :accounts
      resources :transaction_categories
      resources :transactions
    end
  end
end
