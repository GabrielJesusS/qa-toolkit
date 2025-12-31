import messageController from "@/core/MessageController";
import { HandlerMapEnum } from "../../../core/enums/HandlerMapEnum";
import { ProviderSetupCheckHandler } from "./ProviderSetupCheckHandler";
import { TaigaSignInHandler } from "./TaigaSignInHandler";

messageController.registerHandler(HandlerMapEnum.TAIGA_SIGN_IN, TaigaSignInHandler);
messageController.registerHandler(HandlerMapEnum.PROVIDER_SETUP_CHECK, ProviderSetupCheckHandler);
