import messageController from "@/core/MessageController";
import { HandlerMapEnum } from "../../../core/enums/HandlerMapEnum";
import { ProviderSetupCheckHandler } from "./ProviderSetupCheckHandler";

messageController.registerHandler(HandlerMapEnum.PROVIDER_SETUP_CHECK, ProviderSetupCheckHandler);
