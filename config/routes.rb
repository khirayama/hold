Rails.application.routes.draw do
  get '/' => 'static_pages#home'
  get '/app/*pathname' => 'static_pages#app'

  namespace :api, { format: 'json' } do
    namespace :v1 do
      get '/current_user_information' => 'application#current_user_information'

      get '/auth/:provider/callback' => 'sessions#create'
      get '/logout' => 'sessions#destroy'

      resources :accounts
      resources :transaction_categories
      resources :transactions
    end
  end
end
