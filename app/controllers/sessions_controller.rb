class SessionsController < ApplicationController
  def create
    update_locale
    user = User.find_or_create_from_auth_hash(request.env['omniauth.auth'])
    session[:user_id] = user.id

    update_locale(user.setting.language)
    if user.transaction_categories.size == 0
      TransactionCategory.create_initial_transaction_categories(user)
    end

    if user.accounts.size == 0
      Account.create_initial_account(user)
    end

    redirect_to root_path
  end

  def destroy
    reset_session
    redirect_to root_path
  end
end
