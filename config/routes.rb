Rails.application.routes.draw do
  get '/' => 'static_pages#home'
  get '/app' => 'static_pages#app'
  get '/app/*pathname' => 'static_pages#app'

  get '/auth/:provider/callback' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  get '/locale' => 'static_pages#locale'

  namespace :api, { format: 'json' } do
    namespace :v1 do
      get '/current_user_information' => 'application#current_user_information'

      resources :accounts
      resources :transaction_categories
      resources :transactions
    end
  end
end
