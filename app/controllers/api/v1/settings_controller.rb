module Api
  module V1
    class SettingsController < Api::V1::ApplicationController
      before_action :authenticate

      def update
        setting = current_user.setting.find(params[:id])
        setting.update!(setting_params)
      end

      private
        def setting_params
          params.permit(:id, :language, :currency_code, :start_date, :start_date_skip_option)
        end
    end
  end
end
