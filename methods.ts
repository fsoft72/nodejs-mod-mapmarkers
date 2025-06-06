/*
 * This file has been generated by flow2code
 * See: https://flow.liwe.org
 */

import { ILRequest, ILResponse, LCback, ILiweConfig, ILError, ILiWE } from '../../liwe/types';
import { $l } from '../../liwe/locale';
import { system_permissions_register } from '../system/methods';

import {
	Marker, MarkerGoogleAddress, MarkerGoogleAddressKeys, MarkerKeys, MarkerPosition,
	MarkerPositionKeys, MarkerRecord, MarkerRecordKeys,
} from './types';

import _module_perms from './perms';

let _liwe: ILiWE = null;

const _ = ( txt: string, vals: any = null, plural = false ) => {
	return $l( txt, vals, plural, "mapmarkers" );
};

const COLL_MAP_MARKERS_RECORDS = "map_markers_records";

/*=== f2c_start __file_header === */
import { system_domain_get_by_session } from '../system/methods';
import { adb_collection_init, adb_del_one, adb_find_all, adb_find_one, adb_record_add } from '../../liwe/db/arango';
import { keys_valid, mkid } from '../../liwe/utils';
/*=== f2c_end __file_header ===*/

// {{{ get_mapmarkers_get ( req: ILRequest, id: string, cback: LCBack = null ): Promise<Marker>
/**
 *
 * @param id - marker id [req]
 *
 * @return marker: Marker
 *
 */
export const get_mapmarkers_get = ( req: ILRequest, id: string, cback: LCback = null ): Promise<Marker> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start get_mapmarkers_get ===*/
		const err: ILError = { message: "Marker not found" };
		const domain = await system_domain_get_by_session( req );

		const marker = await adb_find_one( req.db, COLL_MAP_MARKERS_RECORDS, { id, domain: domain.code }, MarkerKeys );

		if ( !marker ) {
			return cback ? cback( { message: err.message } ) : reject( { message: err.message } );
		}

		return cback ? cback( null, marker ) : resolve( marker );
		/*=== f2c_end get_mapmarkers_get ===*/
	} );
};
// }}}

// {{{ delete_mapmarkers_admin_del ( req: ILRequest, id: string, cback: LCBack = null ): Promise<boolean>
/**
 *
 * @param id - Marker id [req]
 *
 * @return ok: boolean
 *
 */
export const delete_mapmarkers_admin_del = ( req: ILRequest, id: string, cback: LCback = null ): Promise<boolean> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start delete_mapmarkers_admin_del ===*/
		const domain = await system_domain_get_by_session( req );

		const marker = await adb_find_one( req.db, COLL_MAP_MARKERS_RECORDS, { id, domain: domain.code }, MarkerKeys );
		if ( !marker )
			return cback ? cback( { message: 'Marker not found' }, null ) : reject( { message: 'Marker not found' } );

		await adb_del_one( req.db, COLL_MAP_MARKERS_RECORDS, { id, domain: domain.code } );

		return cback ? cback( null, true ) : resolve( true );
		/*=== f2c_end delete_mapmarkers_admin_del ===*/
	} );
};
// }}}

// {{{ patch_mapmarkers_admin_edit ( req: ILRequest, id: string, title?: string, position?: any, full_address?: MarkerGoogleAddress[], description?: string, address?: string, phone?: string, email?: string, website?: string, enabled?: boolean, cback: LCBack = null ): Promise<Marker>
/**
 *
 * @param id - Marker id [req]
 * @param title -  [opt]
 * @param position - Marker position { lat, lng } [opt]
 * @param full_address -  [opt]
 * @param description -  [opt]
 * @param address -  [opt]
 * @param phone -  [opt]
 * @param email - Marker email [opt]
 * @param website - Marker website url [opt]
 * @param enabled -  [opt]
 *
 * @return marker: Marker
 *
 */
export const patch_mapmarkers_admin_edit = ( req: ILRequest, id: string, title?: string, position?: any, full_address?: MarkerGoogleAddress[], description?: string, address?: string, phone?: string, email?: string, website?: string, enabled?: boolean, cback: LCback = null ): Promise<Marker> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start patch_mapmarkers_admin_edit ===*/
		const domain = await system_domain_get_by_session( req );
		const err: ILError = { message: "Marker not found" };

		let marker = await adb_find_one( req.db, COLL_MAP_MARKERS_RECORDS, { id, domain: domain.code } );
		if ( !marker )
			return cback ? cback( err, null ) : reject( err );

		marker = { ...marker, ...keys_valid( { title, position, full_address, description, address, phone, email, website, enabled } ) };
		marker = await adb_record_add( req.db, COLL_MAP_MARKERS_RECORDS, marker, MarkerKeys );

		return cback ? cback( null, marker ) : resolve( marker );
		/*=== f2c_end patch_mapmarkers_admin_edit ===*/
	} );
};
// }}}

// {{{ get_mapmarkers_list ( req: ILRequest, cback: LCBack = null ): Promise<Marker[]>
/**
 *
 *
 * @return marker: Marker
 *
 */
export const get_mapmarkers_list = ( req: ILRequest, cback: LCback = null ): Promise<Marker[]> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start get_mapmarkers_list ===*/
		const domain = await system_domain_get_by_session( req );

		const markers = await adb_find_all( req.db, COLL_MAP_MARKERS_RECORDS, { domain: domain.code, enabled: true }, MarkerKeys );

		return cback ? cback( null, markers ) : resolve( markers );
		/*=== f2c_end get_mapmarkers_list ===*/
	} );
};
// }}}

// {{{ post_mapmarkers_admin_add ( req: ILRequest, title: string, position: any, full_address?: MarkerGoogleAddress[], description?: string, address?: string, phone?: string, email?: string, website?: string, enabled?: boolean, cback: LCBack = null ): Promise<Marker>
/**
 *
 * @param title - Marker title [req]
 * @param position - Marker position { lat, lng } [req]
 * @param full_address - Google places  object [opt]
 * @param description - Marker description [opt]
 * @param address - Marker address [opt]
 * @param phone - Marker phone [opt]
 * @param email - Marker email [opt]
 * @param website - Marker website [opt]
 * @param enabled -  [opt]
 *
 * @return marker: Marker
 *
 */
export const post_mapmarkers_admin_add = ( req: ILRequest, title: string, position: any, full_address?: MarkerGoogleAddress[], description?: string, address?: string, phone?: string, email?: string, website?: string, enabled?: boolean, cback: LCback = null ): Promise<Marker> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start post_mapmarkers_admin_add ===*/
		const domain = await system_domain_get_by_session( req );
		const err: ILError = { message: "Error adding marker" };

		const marker: Marker & { domain: string; } = {
			id: mkid( 'map_marker' ),
			domain: domain.code,
			title,
			position,
			full_address,
			description,
			address,
			phone,
			email,
			website,
			enabled: enabled || false,
		};

		const res = await adb_record_add( req.db, COLL_MAP_MARKERS_RECORDS, marker, MarkerKeys );
		if ( !res )
			return cback ? cback( err, null ) : reject( err );

		return cback ? cback( null, res ) : resolve( res );
		/*=== f2c_end post_mapmarkers_admin_add ===*/
	} );
};
// }}}

// {{{ get_mapmarkers_admin_list ( req: ILRequest, cback: LCBack = null ): Promise<Marker[]>
/**
 *
 *
 * @return marker: Marker
 *
 */
export const get_mapmarkers_admin_list = ( req: ILRequest, cback: LCback = null ): Promise<Marker[]> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start get_mapmarkers_admin_list ===*/
		const domain = await system_domain_get_by_session( req );

		const markers = await adb_find_all( req.db, COLL_MAP_MARKERS_RECORDS, { domain: domain.code }, MarkerKeys );

		return cback ? cback( null, markers ) : resolve( markers );
		/*=== f2c_end get_mapmarkers_admin_list ===*/
	} );
};
// }}}

// {{{ mapmarkers_db_init ( liwe: ILiWE, cback: LCBack = null ): Promise<boolean>
/**
 *
 * Initializes the module's database
 *
 * @param liwe - The Liwe object [req]
 *
 * @return : boolean
 *
 */
export const mapmarkers_db_init = ( liwe: ILiWE, cback: LCback = null ): Promise<boolean> => {
	return new Promise( async ( resolve, reject ) => {
		_liwe = liwe;

		system_permissions_register( 'mapmarkers', _module_perms );

		await adb_collection_init( liwe.db, COLL_MAP_MARKERS_RECORDS, [
			{ type: "persistent", fields: [ "id" ], unique: true },
			{ type: "persistent", fields: [ "domain" ], unique: false },
			{ type: "persistent", fields: [ "title" ], unique: false },
			{ type: "persistent", fields: [ "enabled" ], unique: false },
		], { drop: false } );

		/*=== f2c_start mapmarkers_db_init ===*/

		/*=== f2c_end mapmarkers_db_init ===*/
	} );
};
// }}}


