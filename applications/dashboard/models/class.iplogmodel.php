<?php if (!defined('APPLICATION')) exit();

/**
 * Log IP Addresses
 * 
 * @author Tim Gunter <tim@vanillaforums.com>
 * @copyright 2003 Vanilla Forums, Inc
 * @license http://www.opensource.org/licenses/gpl-2.0.php GPL
 * @package Garden
 * @since 2.1
 */

class IpLogModel extends Gdn_Model {
   
   /**
    * Log
    * 
    * @param integer $UserID
    * @param string $IPAddress
    * @param string $Event
    */
   public function Log($UserID, $IPAddress, $Event) {
      $IpLog = array(
         'UserID'    => $UserID,
         'Event'     => $Event,
         'IPAddress' => $IPAddress,
         'IPLong'    => ip2long($IPAddress)
      );
      return $this->Save($IpLog);
   }
   
   /**
    * Log an IP event
    * 
    * @param type $IpLog
    */
   public function Save($IpLog) {
      parent::Save($IpLog);
   }
   
}