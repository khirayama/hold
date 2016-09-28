class SessionsController < ApplicationController
  def create
    update_locale
    user = User.find_or_create_from_auth_hash(request.env['omniauth.auth'])
    session[:user_id] = user.id

    if user.transaction_categories.size == 0
      update_locale(user.setting.language)
      TransactionCategory.create_initial_transaction_categories(user)
    end

    redirect_to dashboard_path
  end

  def destroy
    reset_session
    redirect_to dashboard_path
  end
end
