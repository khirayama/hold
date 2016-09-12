module Api
  module V1
    class SessionsController < Api::V1::ApplicationController
      def create
        user = User.find_or_create_from_auth_hash(request.env['omniauth.auth'])
        session[:user_id] = user.id

        create_initial_transaction_categories

        redirect_to '/'
      end

      def destroy
        reset_session
        redirect_to '/'
      end

        private

        def create_initial_transaction_categories
          # Payment
          current_user.transaction_categories.create(name: "Food", payment: true, income: false)
          current_user.transaction_categories.create(name: "Daily goods", payment: true, income: false)
          current_user.transaction_categories.create(name: "Transport", payment: true, income: false)
          current_user.transaction_categories.create(name: "Network", payment: true, income: false)
          current_user.transaction_categories.create(name: "Utilities", payment: true, income: false)
          current_user.transaction_categories.create(name: "Home", payment: true, income: false)
          current_user.transaction_categories.create(name: "Socializing", payment: true, income: false)
          current_user.transaction_categories.create(name: "Hobbies", payment: true, income: false)
          current_user.transaction_categories.create(name: "Education", payment: true, income: false)
          current_user.transaction_categories.create(name: "Medical", payment: true, income: false)
          current_user.transaction_categories.create(name: "Other", payment: true, income: false)

          # Income
          current_user.transaction_categories.create(name: "Salary", payment: false, income: true)
          current_user.transaction_categories.create(name: "Bonus", payment: false, income: true)
          current_user.transaction_categories.create(name: "Other", payment: false, income: true)
        end
    end
  end
end
