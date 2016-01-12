class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all
    render :index
  end

  def show
    @track = Track.find(params[:id])
    render :show
  end

  def create
    @track = Track.new(track_params)

    if @track.save
      render :show
    else
      render json: {error: @track.errors.full_messages}, status: 422
    end
  end

  private
  def track_params
    params.require(:track).permit(:name, :roll)
  end
end
