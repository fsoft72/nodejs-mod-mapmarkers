/*
 * This file has been generated by flow2code
 * See: https://flow.liwe.org
 */

import { ILRequest, ILResponse, ILError, ILiWE } from '../../liwe/types';
import { send_error, send_ok, typed_dict } from "../../liwe/utils";
import { locale_load } from '../../liwe/locale';

import { perms } from '../../liwe/auth';

import {
	// endpoints function
	delete_mapmarkers_admin_del, get_mapmarkers_admin_list, get_mapmarkers_get, get_mapmarkers_list, patch_mapmarkers_admin_edit,
	post_mapmarkers_admin_add,
	// functions
	
} from './methods';

import {
	Marker, MarkerGoogleAddress, MarkerGoogleAddressKeys, MarkerKeys, MarkerPosition,
	MarkerPositionKeys, MarkerRecord, MarkerRecordKeys,
} from './types';

/*=== f2c_start __header ===*/
import { mapmarkers_db_init } from './methods';
/*=== f2c_end __header ===*/

export const init = ( liwe: ILiWE ) => {
	const app = liwe.app;

	console.log( "    - mapmarkers " );

	liwe.cfg.app.languages.map( ( l ) => locale_load( "mapmarkers", l ) );
	mapmarkers_db_init ( liwe );

	app.get ( '/api/mapmarkers/get', ( req: ILRequest, res: ILResponse ) => {
		const { id, ___errors } = typed_dict( req.query as any, [
			{ name: "id", type: "string", required: true }
		] );

		if ( ___errors.length ) return send_error ( res, { message: `Parameters error: ${___errors.join ( ', ' )}` } );

		get_mapmarkers_get ( req, id, ( err: ILError, marker: Marker ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { marker } );
		} );
	} );

	app.delete ( '/api/mapmarkers/admin/del', ( req: ILRequest, res: ILResponse ) => {
		const { id, ___errors } = typed_dict( req.body, [
			{ name: "id", type: "string", required: true }
		] );

		if ( ___errors.length ) return send_error ( res, { message: `Parameters error: ${___errors.join ( ', ' )}` } );

		delete_mapmarkers_admin_del ( req, id, ( err: ILError, ok: boolean ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { ok } );
		} );
	} );

	app.patch ( '/api/mapmarkers/admin/edit', ( req: ILRequest, res: ILResponse ) => {
		const { id, title, position, full_address, description, address, phone, email, website, enabled, ___errors } = typed_dict( req.body, [
			{ name: "id", type: "string", required: true },
			{ name: "title", type: "string" },
			{ name: "position", type: "any" },
			{ name: "full_address", type: "MarkerGoogleAddress[]" },
			{ name: "description", type: "string" },
			{ name: "address", type: "string" },
			{ name: "phone", type: "string" },
			{ name: "email", type: "string" },
			{ name: "website", type: "string" },
			{ name: "enabled", type: "boolean" }
		] );

		if ( ___errors.length ) return send_error ( res, { message: `Parameters error: ${___errors.join ( ', ' )}` } );

		patch_mapmarkers_admin_edit ( req, id, title, position, full_address, description, address, phone, email, website, enabled, ( err: ILError, marker: Marker ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { marker } );
		} );
	} );

	app.get ( '/api/mapmarkers/list', ( req: ILRequest, res: ILResponse ) => {
		

		get_mapmarkers_list ( req, ( err: ILError, marker: Marker ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { marker } );
		} );
	} );

	app.post ( '/api/mapmarkers/admin/add', ( req: ILRequest, res: ILResponse ) => {
		const { title, position, full_address, description, address, phone, email, website, enabled, ___errors } = typed_dict( req.body, [
			{ name: "title", type: "string", required: true },
			{ name: "position", type: "any", required: true },
			{ name: "full_address", type: "MarkerGoogleAddress[]" },
			{ name: "description", type: "string" },
			{ name: "address", type: "string" },
			{ name: "phone", type: "string" },
			{ name: "email", type: "string" },
			{ name: "website", type: "string" },
			{ name: "enabled", type: "boolean" }
		] );

		if ( ___errors.length ) return send_error ( res, { message: `Parameters error: ${___errors.join ( ', ' )}` } );

		post_mapmarkers_admin_add ( req, title, position, full_address, description, address, phone, email, website, enabled, ( err: ILError, marker: Marker ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { marker } );
		} );
	} );

	app.get ( '/api/mapmarkers/admin/list', ( req: ILRequest, res: ILResponse ) => {
		

		get_mapmarkers_admin_list ( req, ( err: ILError, marker: Marker ) => {
			if ( err ) return send_error( res, err );

			send_ok( res, { marker } );
		} );
	} );

};
