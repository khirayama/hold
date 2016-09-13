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
          current_user.transaction_categories.create(name: "Food", transaction_type: :payment)
          current_user.transaction_categories.create(name: "Daily goods", transaction_type: :payment)
          current_user.transaction_categories.create(name: "Transport", transaction_type: :payment)
          current_user.transaction_categories.create(name: "Network", transaction_type: :payment)
          current_user.transaction_categories.create(name: "Utilities", transaction_type: :payment)
          current_user.transaction_categories.create(name: "Home", transaction_type: :payment)
          current_user.transaction_categories.create(name: "Socializing", transaction_type: :payment)
          current_user.transaction_categories.create(name: "Hobbies", transaction_type: :payment)
          current_user.transaction_categories.create(name: "Education", transaction_type: :payment)
          current_user.transaction_categories.create(name: "Medical", transaction_type: :payment)
          current_user.transaction_categories.create(name: "Other", transaction_type: :payment)

          # Income
          current_user.transaction_categories.create(name: "Salary", transaction_type: :income)
          current_user.transaction_categories.create(name: "Bonus", transaction_type: :income)
          current_user.transaction_categories.create(name: "Other", transaction_type: :income)
        end
    end
  end
end
