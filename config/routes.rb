Rails.application.routes.draw do
  # static page
  root 'static_pages#home'

  # sessions
  get '/auth/:provider/callback' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  # application
  get '/dashboard' => 'static_pages#application'
  get '/transactions' => 'static_pages#application'
  get '/transaction_categories' => 'static_pages#application'
  get '/setting' => 'static_pages#application'

  namespace :api, { format: 'json' } do
    namespace :v1 do
      get '/user' => 'application#user'

      resource :setting

      resources :accounts
      resources :transaction_categories
      resources :transactions
    end
  end
end
