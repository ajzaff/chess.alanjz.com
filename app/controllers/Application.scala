package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {
	val fen_init = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

  def index = Action {
    Ok(views.html.index())
  }

	def board(fen: String) = Action {
		if(fen == null) Ok(views.html.board(fen_init))
		else Ok(views.html.board(fen))
	}
}
