module Api
  module V1
    class TransactionCategoriesController < Api::V1::ApplicationController
      before_action :authenticate

      def index
        transaction_categories = current_user.transaction_categories.map do |transaction_category|
          omit_transaction_category(transaction_category)
        end
        render json: transaction_categories
      end

      def create
        transaction_category = current_user.transaction_categories.build(transaction_category_params)
        if transaction_category.save
          render json: omit_transaction_category(transaction_category)
        end
      end

      def update
        transaction_category = current_user.transaction_categories.find(params[:id])
        if transaction_category.update(transaction_category_params)
          render json: omit_transaction_category(transaction_category)
        end
      end

      def destroy
        transaction_category = current_user.transaction_categories.find(params[:id])
        transaction_category.destroy!
      end

      private
        def transaction_category_params
          params.permit(:id, :name)
        end

        def omit_transaction_category(transaction_category)
          {
            id: transaction_category.id,
            name: transaction_category.name
          }
        end
    end
  end
end
