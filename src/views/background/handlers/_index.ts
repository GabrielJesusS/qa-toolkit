import messageController from "@/core/MessageController";
import { HandlerMapEnum } from "../../../core/enums/HandlerMapEnum";
import { GetAppConfigHandler } from "./GetAppConfigHandler";
import { TaigaSignInHandler } from "./TaigaSignInHandler";
import { ScreenShotHandler } from "./ScreenShotHandler";
import { ListProjectsHandler } from "./ListProjectsHandler";
import { CreateIssueHandler } from "./CreateIssueHandler";
import { SaveTaigaSettingsHandler } from "./SaveTaigaSettingsHandler";
import { GetTaigaSettingsHandler } from "./GetTaigaSettingsHandler";
import { SetAppConfigHandler } from "./SetAppConfigHandler";

messageController.registerHandler(HandlerMapEnum.TAIGA_SIGN_IN, TaigaSignInHandler);
messageController.registerHandler(HandlerMapEnum.GET_APP_CONFIG, GetAppConfigHandler);
messageController.registerHandler(HandlerMapEnum.TAKE_SCREENSHOT, ScreenShotHandler)
messageController.registerHandler(HandlerMapEnum.LIST_PROJECTS, ListProjectsHandler)
messageController.registerHandler(HandlerMapEnum.CREATE_ISSUE, CreateIssueHandler)
messageController.registerHandler(HandlerMapEnum.SAVE_TAIGA_SETTINGS, SaveTaigaSettingsHandler)
messageController.registerHandler(HandlerMapEnum.GET_TAIGA_SETTINGS, GetTaigaSettingsHandler)
messageController.registerHandler(HandlerMapEnum.SET_APP_CONFIG, SetAppConfigHandler);
